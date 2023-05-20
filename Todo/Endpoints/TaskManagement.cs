
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Todo.Core.Enums;

namespace Todo.Endpoints
{
    public class TaskManagement : CarterModule
    {

        public TaskManagement() : base("/mytask")
        {
            this.RequireAuthorization();
        }
        public override void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("/", GetResultAsync);
            app.MapPost("/", AddTodoItemAsync);

            app.MapDelete("/{id}", DeleteTodoItemAsync);

            app.MapPut("/", UpdateTodoItemAsync);

        }
        private async Task<IResult> GetResultAsync(HttpContext context, UserManager<AppUser> userManager, IServiceProvider serviceProvider)
        {
            //Get logged user
            var user = await userManager.GetUserAsync(context.User);

            using var scope = serviceProvider.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

            var tasks = await dbContext.Todos.Where(x => x.AppUserId == user.Id).ToListAsync();


            return Results.Ok(tasks);
        }


        private async Task<IResult> AddTodoItemAsync(HttpContext context, AddTodoItemDto addTodoItemDto, UserManager<AppUser> userManager, IServiceProvider serviceProvider)
        {
            if (addTodoItemDto == null)
            {
                return Results.BadRequest();
            }

            var user = await userManager.GetUserAsync(context.User);

            var todoItemToAdd = new TodoItem
            {
                Id = Guid.NewGuid().ToString(),
                Title = addTodoItemDto.Title,
                Description = addTodoItemDto.Description,
                DueDate = addTodoItemDto.DueDate,
                Status = TodoStatus.Pending,
                AppUserId = user.Id,
            };

            using var scope = serviceProvider.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

            await dbContext.Todos.AddAsync(todoItemToAdd);
            await dbContext.SaveChangesAsync();

            var todoItemDto = new TodoItemDto();

            todoItemDto.Id = todoItemToAdd.Id;
            todoItemDto.Title = todoItemToAdd.Title;
            todoItemDto.Description = todoItemToAdd.Description;
            todoItemDto.DueDate = DateTime.Now;

            return Results.Ok(todoItemToAdd);
        }

        private async Task<IResult> UpdateTodoItemAsync(TodoItemDto updateTodo, IServiceProvider serviceProvider)
        {
            if (updateTodo == null)
            {
                return Results.BadRequest();
            }

            using var scope = serviceProvider.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

            var todoItem = await dbContext.Todos.FindAsync(updateTodo.Id);
            if (todoItem == null)
            {
                return Results.BadRequest();
            }
            todoItem.Title = updateTodo.Title;
            todoItem.Description = updateTodo.Description;
            todoItem.DueDate = updateTodo.DueDate;
            todoItem.Status = updateTodo.Status;

            todoItem.Id = Guid.NewGuid().ToString();

            dbContext.Update(todoItem);
            await dbContext.SaveChangesAsync();

            var todoItemDto = new TodoItemDto();

            todoItemDto.Id = todoItem.Id;
            todoItemDto.Title = todoItem.Title;
            todoItemDto.Description = todoItem.Description;
            todoItemDto.DueDate = DateTime.Now;

            return Results.Ok(todoItem);
        }

        private async Task<IResult> DeleteTodoItemAsync(string id, IServiceProvider serviceProvider)
        {
            using var scope = serviceProvider.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            var todo = await dbContext.Todos.FindAsync(id);
            if (todo == null)
            {
                return Results.NotFound();
            }

            dbContext.Todos.Remove(todo);
            await dbContext.SaveChangesAsync();

            return Results.Ok("Deleted " + id);
        }
    }
}
