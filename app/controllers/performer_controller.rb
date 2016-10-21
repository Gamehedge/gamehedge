class PerformerController < ApplicationController
  def show
  	require 'date'
	@year = Date.today.strftime("%Y")
  	@performer = Performer.where(te_uid: params[:id]).first
  	@leagueList = Sport.where(active: true)
	@divisions_menu = Division.all
	@performers_menu = Performer.all
	@testimonials = Testimonial.where(performer_id: @performer.id)
	@id = @performer.id
  end
end
