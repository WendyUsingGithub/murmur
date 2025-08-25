


// export class UserDataBack2Front {
//   constructor(UserDataBackEnd) {
//     this.userId = UserDataBackEnd._id.toString();
//     this.name = UserDataBackEnd.name;
//     this.nameZH = UserDataBackEnd.nameZH;
//     this.introduction = UserDataBackEnd.introduction;
//   }
// }

export class UserDataFrontEnd {
  constructor(UserDataBack2Front) {
    this.userId = UserDataBack2Front;
    this.name = UserDataBack2Front.name;
    this.nameZH = UserDataBack2Front.nameZH;
    this.introduction = UserDataBack2Front.introduction;
  }
}

// export class PostDataBack2Front {
//   constructor(postDataBackEnd) {
//     this.postId = postDataBackEnd._id.toString();
//     this.commentId = postDataBackEnd._id.toString();
//     this.parentId = postDataBackEnd._id.toString();
//     this.author = postDataBackEnd.author;
//     this.content = postDataBackEnd.content;
//     this.tag = postDataBackEnd.tag;
//     this.likesNum = postDataBackEnd.likes.length;
//     this.commentsNum = postDataBackEnd.commentsNum;
//     this.createdAt = postDataBackEnd.createdAt.toISOString();
//     this.like = false;
//   }
// }

export class PostDataFrontEnd {
  constructor(PostDataBack2Front) {
    this.postId = PostDataBack2Front.postId;
    this.commentId = PostDataBack2Front.commentId;
    this.parentId = PostDataBack2Front.parentId;
    this.author = PostDataBack2Front.author;
    this.content = PostDataBack2Front.content;
    this.tag = PostDataBack2Front.tag ? PostDataBack2Front.tag : null;
    this.likesNum = PostDataBack2Front.likesNum;
    this.commentsNum = PostDataBack2Front.commentsNum;
    this.createdAt = PostDataBack2Front.createdAt;
    this.like = PostDataBack2Front.like;
  }
}

// class CommentDataBack2Front {
//   constructor(commentDataBackEnd) {
//     this.postId = commentDataBackEnd.postId.toString();
//     this.commentId = commentDataBackEnd._id.toString();
//     this.parentId = commentDataBackEnd.parentId.toString();
//     this.author = commentDataBackEnd.author;
//     this.content = commentDataBackEnd.content;
//     this.likesNum = commentDataBackEnd.likes.length;
//     this.commentsNum = commentDataBackEnd.commentsNum;
//     this.createdAt = commentDataBackEnd.createdAt.toISOString();
//     this.like = false;
//   }
// }

export class CommentDataFrontEnd {
  constructor(CommentDataBack2Front) {
    this.postId = CommentDataBack2Front.postId;
    this.commentId = CommentDataBack2Front.commentId;
    this.parentId = CommentDataBack2Front.parentId;
    this.author = CommentDataBack2Front.author;
    this.content = CommentDataBack2Front.content;
    this.tag = null;
    this.likesNum = CommentDataBack2Front.likesNum;
    this.commentsNum = CommentDataBack2Front.commentsNum;
    this.createdAt = CommentDataBack2Front.createdAt;
    this.like = CommentDataBack2Front.like;
  }
}