class CommentsController < ApplicationController

	def create
		post = comments_post_find
		comment = post.comments.create(comment_params)
		respond_with post, comment
	end

	def vote
		post = comments_post_find
		comment = post.comments.find(params[:id])
		if (params[:incDec] == 'inc')
			respond_with post, comment.increment!(:votes)
		else
			respond_with post, comment.decrement!(:votes)
		end
	end

	def comments_post_find
		Post.find(params[:post_id])
	end

	private
	def comment_params 
		params.require(:comment).permit(:body, :votes)
	end

end
