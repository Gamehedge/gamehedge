class TicketsController < ActionController::Base
  def list
  	@events = TicketEvolutionService.new({:type => "tickets", :id => request.GET["id"]}).list
  	render json: @events
  end
end