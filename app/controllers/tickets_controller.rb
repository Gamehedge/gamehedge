class TicketsController < ActionController::Base
  def list
  	#@events = TicketEvolutionService.new({:type => "tickets", :id => request.GET["id"]}).list
  	#render json: @events
    
    url = URI.parse("https://api.ticketevolution.com/v9/ticket_groups?event_id=1013003&lightweight=true")
    
    req = Net::HTTP::Get.new(url.to_s)
    req.add_field("X-Signature", "fUFmAmPIMaoHXsrT5vHtERurnUViQN50h2n4J+u6GiI=")
    req.add_field("X-Token", "4665b0c543845003cd0f86763bdb5d43")
    res = Net::HTTP.new(url.host, url.port)
    res.use_ssl = true
    response = res.request(req)

    render json: response.body
      
  end
  def show
  	@event = TicketEvolutionService.new({:type => "tickets", :id => request.GET["id"]}).show
  	render json: @event
  end
end