using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using Microsoft.Extensions.Logging;


class Program
{
	static void Main(string[] args)
	{
		Console.WriteLine("Hello World!");

		var loggerFactory = LoggerFactory.Create(builder => { builder.AddConsole(); });

		var context = new MyDbContext(loggerFactory);
		context.Database.EnsureCreated();
		InitializeData(context);

		Console.WriteLine("All posts:");
		var data = context.BlogPosts.Select(x => x.Title).ToList();
		Console.WriteLine(JsonSerializer.Serialize(data));
			
        // Приступил к выполнению в ~22:15.
		Console.WriteLine("How many comments each user left:");
		//ToDo: write a query and dump the data to console
		// Expected result (format could be different, e.g. object serialized to JSON is ok):
		// Ivan: 4
		// Petr: 2
		// Elena: 3

		var everyUserCommentsCount = context.BlogComments
			.GroupBy(comment => comment.UserName)
			.Select((comments => new
			{
				comments.Key,
				Count = comments.Count()
			})).OrderBy(pair => pair.Count);

        foreach (var pair in everyUserCommentsCount)
        {
            Console.WriteLine($"{pair.Key}: {pair.Count}");
        }
        

		Console.WriteLine("Posts ordered by date of last comment." +
                          " Result should include text of last comment:");
		//ToDo: write a query and dump the data to console
		// Expected result (format could be different, e.g. object serialized to JSON is ok):
		// Post2: '2020-03-06', '4'
		// Post1: '2020-03-05', '8'
		// Post3: '2020-02-14', '9'

        var orderedPostsContent = context.BlogPosts
            .Select(data => new
            {
                data.Title,
                LastCommentDate = data.Comments
                    .OrderBy(comment => comment.CreatedDate).LastOrDefault().CreatedDate,
				LastCommentContent = data.Comments
                    .OrderBy(comment => comment.CreatedDate).LastOrDefault().Text

            }).OrderBy(postInfo => postInfo.Title);

        foreach (var postContent in orderedPostsContent)
        {
            Console.WriteLine($"{postContent.Title}: " +
                              $"{postContent.LastCommentDate.ToShortDateString()}, " +
                              $"{postContent.LastCommentContent}");
        }


        Console.WriteLine("How many last comments each user left:");
		// 'last comment' is the latest Comment in each Post
		//ToDo: write a query and dump the data to console
		// Expected result (format could be different, e.g. object serialized to JSON is ok):
		// Ivan: 2
		// Petr: 1
        var eachUserLastComment = context.BlogComments
            .GroupBy(comment => comment.UserName)
            .Select((comment => new
            {
                Name = comment.Key,
                LastCommentsCount = context.BlogPosts.Where(post => post.Comments
                        .OrderByDescending(it => it.CreatedDate)
                        .First().UserName.Equals(comment.Key)).Count(),
            }));

        foreach (var pair in eachUserLastComment)
        {
            Console.WriteLine($"{pair.Name}: {pair.LastCommentsCount}");
        }

		//Завершил задание в 23:10.

        // Console.WriteLine(
        //     JsonSerializer.Serialize(BlogService.NumberOfCommentsPerUser(context)));
        // Console.WriteLine(
        //     JsonSerializer.Serialize(BlogService.PostsOrderedByLastCommentDate(context)));
        // Console.WriteLine(
        //     JsonSerializer.Serialize(BlogService.NumberOfLastCommentsLeftByUser(context)));

    }

	private static void InitializeData(MyDbContext context)
	{
		context.BlogPosts.Add(new BlogPost("Post1")
		{
			Comments = new List<BlogComment>()
			{
				new BlogComment("1", new DateTime(2020, 3, 2), "Petr"),
				new BlogComment("2", new DateTime(2020, 3, 4), "Elena"),
				new BlogComment("8", new DateTime(2020, 3, 5), "Ivan"),
			}
		});
		context.BlogPosts.Add(new BlogPost("Post2")
		{
			Comments = new List<BlogComment>()
			{
				new BlogComment("3", new DateTime(2020, 3, 5), "Elena"),
				new BlogComment("4", new DateTime(2020, 3, 6), "Ivan"),
			}
		});
		context.BlogPosts.Add(new BlogPost("Post3")
		{
			Comments = new List<BlogComment>()
			{
				new BlogComment("5", new DateTime(2020, 2, 7), "Ivan"),
				new BlogComment("6", new DateTime(2020, 2, 9), "Elena"),
				new BlogComment("7", new DateTime(2020, 2, 10), "Ivan"),
				new BlogComment("9", new DateTime(2020, 2, 14), "Petr"),
			}
		});
		context.SaveChanges();
	}
}