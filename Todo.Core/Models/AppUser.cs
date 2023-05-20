using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Todo.Core.Models
{
    public class AppUser: IdentityUser
    {
        public string Name { get; set; }
        public DateTime LastLogin { get; set; }
        public List<TodoItem> TodoItems { get; set; } = new List<TodoItem>();
    }
}
