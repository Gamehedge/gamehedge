class TicketsController < ActionController::Base
  def list
  	@events = TicketEvolutionService.new({:type => "tickets", :id => request.GET["id"]}).list
      
    #@events.each do |event|
    #    if event.splits.size > 0
    #        event.amount = event.splits[event.splits.size-1].to_i
    #    else
    #        event.amount = 0
    #    end
    #end
      
  	render json: @events
  end
  def show
  	@event = TicketEvolutionService.new({:type => "tickets", :id => request.GET["id"]}).show
  	render json: @event
  end
end