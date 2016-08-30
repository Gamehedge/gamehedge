class ClientsController < ActionController::Base
  def show
  	@client = TicketEvolutionService.new({:type => "clients", :id => request.GET["id"]}).show
  	@id = @client["id"]
  	@cards = TicketEvolutionService.new({:type => "cards", :id => @id}).list
  	render json: {:client => @client,:cards => @cards}
  end
end