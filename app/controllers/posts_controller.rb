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
		respond_with post_find.increment!(:votes) 
	end

	def post_find
		Post.find(params[:id])
	end

	private
	def post_params 
		params.require(:post).permit(:link, :title)
	end

end
