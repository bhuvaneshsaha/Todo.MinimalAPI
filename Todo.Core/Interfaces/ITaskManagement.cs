using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Todo.Core.Models;

namespace Todo.Core.Interfaces
{
    public interface ITaskManagement
    {
        Task CreateAsync(TodoItem todoItem);
        Task DeleteAsync(string id);
        Task<IEnumerable<TodoItem>> GetAllAsync();
        Task<TodoItem> GetByIdAsync(string id);
        Task Update(TodoItem todoItem);

    }
}
