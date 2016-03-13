class CommentsController < ApplicationController

	def create
		post = comments_post_find
		comment = post.comments.create(params[:id])
		respond_with post, comment
	end

	def vote
		post = comments_post_find
		comment = comments.find(params[:id])
		respond_with post, comment.increment!(:vote)
	end

	def comments_post_find
		Post.find(params[:post_id])
	end

	private
	def comment_params 
		params.require(:comment).permit(:body)
	end

end
