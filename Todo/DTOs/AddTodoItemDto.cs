﻿namespace Todo.DTOs
{
    public class AddTodoItemDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
    }
}
