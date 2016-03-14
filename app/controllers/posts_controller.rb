class PostsController < ApplicationController

	def index
		respond_with Post.all
	end

	def create
		respond_with Post.create(post_params)
	end

	def show
		respond_with post_find 
	end

	def vote
		if params[:incDec] == 'inc'
			respond_with post_find.increment!(:votes) 
		else
			respond_with post_find.decrement!(:votes) 
		end
	end

	def post_find
		Post.find(params[:id])
	end

	private
	def post_params 
		params.require(:post).permit(:link, :title, :votes)
	end

end
