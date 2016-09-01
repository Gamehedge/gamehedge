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
  def get_session
  	@datetime = Time.now.strftime("%Y%m%d%H%M%S")
    @random = SecureRandom.hex(4)
    @session_id = "#{@random}#{@datetime}"
    render text: @session_id
  end
  def info
      @mid = 132228 
      @session = params[:session]
      redirect_to "https://ssl.kaptcha.com/logo.htm?m=#{@mid.to_s}&s=#{@session.to_s}"
  end
  def create
    if request.post?
      if Client.exists?(email: params[:email])
        render json: {:error => "Email already registered. Please login and try again"}
      else
        @temp_password = ([*('A'..'Z'),*('0'..'9')]-%w(0 1 I O)).sample(8).join
        @user = Client.new(:email => params[:email],
          :password => @temp_password,
          :password_confirmation => @temp_password,
          :name => params[:name],
        )
        @user.save
        if @user.id
          sign_in @user
          @client = TicketEvolutionService.new({:type => "client"}).add({:name => request.POST["name"], :street_address => request.POST["street_address"], :locality => request.POST["locality"], :region => request.POST["region"], :postal_code => request.POST["postal_code"], :country_code => request.POST["country_code"], :email => request.POST["email"], :phone_number => request.POST["phone_number"]})
          if @client.error
            puts "error"
          else
            @user.te_uid = @client.id
            @user.save
          end
          render json: {:client => @client,:user => @user}
        else
          render json: {:error => "There was an error, please try again"}
        end
      end
    end
  end
  def update_password
    @user = Client.where(email: params[:email]).first
    @user.password = params[:password]
    @user.password_confirmation = params[:password]
    @user.save
    render text: "Success"
  end
end