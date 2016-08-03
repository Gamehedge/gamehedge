class SearchController < ActionController::Base
  def index

  	
  	Performer.all.each do |performer|
  		performer.url = '/perfomers/'+String(performer.id)
  		performer.priority = 1
  		performer.save
  	end
  	Sport.all.each do |sport|
  		sport.url = '/leagues/'+String(sport.id)
  		sport.priority = 2
  		sport.save
  	end
  	Venue.all.each do |venue|
  		venue.url = '/venues/'+String(venue.id)
  		venue.priority = 3
  		venue.save
  	end
  	if params[:search].present?
  		@books = MainSearch.new(query: params[:search], limit: params[:limit]).results
  	else
  		@books = []
  	end
  	render json: @books
  end
end