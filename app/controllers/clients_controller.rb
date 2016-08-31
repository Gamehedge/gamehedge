class ClientsController < ActionController::Base
  def show
  	@client = TicketEvolutionService.new({:type => "clients", :id => request.GET["id"]}).show
  	@id = @client["id"]
  	@cards = TicketEvolutionService.new({:type => "cards", :id => @id}).list
  	render json: {:client => @client,:cards => @cards}
  end
  def add_address
  	if request.post?
	  	@address = TicketEvolutionService.new({:type => "address", :id => request.POST["id"]}).add({:name => request.POST["name"], :street_address => request.POST["street_address"], :locality => request.POST["locality"], :region => request.POST["region"], :postal_code => request.POST["postal_code"], :country_code => request.POST["country_code"]})
	  	render json: @address
	end
  end
  def add_credit_card
  	if request.post?
	  	@cc = TicketEvolutionService.new({:type => "card", :id => request.POST["id"]}).add({:address_id => request.POST["address_id"], :number => request.POST["number"], :expiration_month => request.POST["expiration_month"], :expiration_year => request.POST["expiration_year"], :verification_code => request.POST["verification_code"], :name => request.POST["name"]})
	  	render json: @cc
	end
  end
end