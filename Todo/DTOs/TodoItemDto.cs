﻿using Todo.Core.Enums;

namespace Todo.DTOs
{
    public class TodoItemDto
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; } = DateTime.Now;
        public DateTime UpdatedDate { get; set;}
        public TodoStatus Status { get; set; }
    }

    public class UpdateTodoDto {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; } 
        public DateTime? DueDate { get; set; }
    }
}
