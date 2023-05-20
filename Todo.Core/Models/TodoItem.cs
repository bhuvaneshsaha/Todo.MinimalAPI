using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Todo.Core.Enums;

namespace Todo.Core.Models
{

    public class TodoItem
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public TodoStatus Status { get; set; }

        // Foreign Key for AppUser
        public string AppUserId { get; set; }

        // Navigation property for AppUser
        public AppUser AppUser { get; set; }
    }
}
