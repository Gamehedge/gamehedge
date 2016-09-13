class SearchController < ActionController::Base
  def index

  	if params[:search].present?

  		# @results = MainSearch.new(query: params[:search], limit: params[:limit]).results
  		search_text = params[:search]
  		@p = Performer.where("te_uid is not null").where("name ILIKE ?", "%#{search_text}%").order(:name).limit(params[:limit]).select('id, name, url')
  		@v = Venue.where("te_uid is not null").where("name ILIKE ?", "%#{search_text}%").order(:name).limit(params[:limit]).select('id, name, url')
      @pl = Player.where("name ILIKE ?", "%#{search_text}%").order(:name).limit(params[:limit]).select('id, name, url')
  		@e = Event.where("te_uid is not null").where("occurs_at >=?", params[:today_date]).where("name ILIKE ?", "%#{search_text}%").order(:occurs_at).limit(params[:limit]).select('id, name, url')
  		@results = [*@p,*@v,*@e,*@pl]
  	else
  		@results = []
  	end
  	render json: @results
  end
end