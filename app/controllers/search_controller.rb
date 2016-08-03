class SearchController < ActionController::Base
  def index

  	if params[:search].present?
  		@books = MainSearch.new(query: params[:search], limit: params[:limit]).results
  	else
  		@books = []
  	end
  	render json: @books
  end
end