class Todo {
  id: number;
  text: string;

  constructor(todoText: string, todoId: number) {
    this.text = todoText;
    this.id = todoId;
  }
}

export default Todo;
