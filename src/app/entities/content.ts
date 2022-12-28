export class Content {
  private readonly content: string;

  get value(): string {
    return this.content;
  }

  private validateContentLenght(content: string): boolean {
    return content.length >= 4 && content.length <= 240;
  }

  constructor(content: string) {
    const isContentLenghtValidate = this.validateContentLenght(content);

    if (!isContentLenghtValidate) {
      throw new Error('Content length error');
    }

    this.content = content;
  }
}
