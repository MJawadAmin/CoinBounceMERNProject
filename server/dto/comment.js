class commentDTO {
    constructor(comment) {
        this.id = comment._id;
        this.content = comment.content;
        this.author = comment.author;
        this.blog = comment.blog;
        this.createdAt = comment.createdAt;
    }
}

export default commentDTO; // Ensure it is exported as default
