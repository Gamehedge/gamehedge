class TicketsController < ActionController::Base
  def list
  	@events = TicketEvolutionService.new({:type => "tickets", :id => request.GET["id"]}).list
  	render json: @events
  end
  def show
  	@event = TicketEvolutionService.new({:type => "tickets", :id => request.GET["id"]}).show
  	render json: @event
  end
end