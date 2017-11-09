class ClientsController < ActionController::Base
  def show

    core_account_use = request.POST["core_account"]
    #core_account_use = "2"
    #if (cookies['govxss'].to_s == "1")
    #  core_account_use = "1"
    #end
    if (core_account_use.to_s == "")
      core_account_use = request.GET["core_account"]      
    end

    puts "CLIENTS_CONTROLLER:: SHOW :: core_acc: "+core_account_use


    @client = TicketEvolutionService.new({:type => "clients", :id => request.GET["id"], :core_account => core_account_use}).show
    #puts @client

    @id = @client["id"]
    puts "CLIENT ID: " + @id.to_s

    if (@id.to_s != "") 
      if (core_account_use == "1" || core_account_use == "")
        cookies['govxss'] = {
          :value => '1',
          :expires => 10000.hour.from_now
        }  
        cookies['isghgovx'] = {
          :value => '1',
          :expires => 10000.hour.from_now
        }  
      else
        cookies['govxss'] = {
          :value => '1',
          :expires => -1.hour.from_now
        }  
        cookies['isghgovx'] = {
          :value => '1',
          :expires => -1.hour.from_now
        }  
      end
    end


    if (@id.to_s == "") #WRONG CORE ACCOUNT. SWIPING ACCOUNTS!
      if (core_account_use == "1")
        core_account_use = "2"
      else
        core_account_use = "1"
      end
      @client = TicketEvolutionService.new({:type => "clients", :id => request.GET["id"], :core_account => core_account_use}).show
      #puts @client
  
      @id = @client["id"]
      puts "CLIENT ID FROM OTHER ACCOUNT: " + @id.to_s  

      if (@id.to_s != "") #FOUND ID ON ANOTHER ACCOUT. NOW LET'S SWIPE LAYOUTS
        if (core_account_use == "1")  #THIS IS GOVX CUSTOMER. SET IT TO GOVX
          puts "CHANGING TO GOVX - SETTING GOVX COOKIE"
          cookies['govxss'] = {
            :value => '1',
            :expires => 10000.hour.from_now
          }  
          cookies['isghgovx'] = {
            :value => '1',
            :expires => 10000.hour.from_now
          }  
  
        else                          #THIS IS GAMEHEDGE CUSTOMER
          puts "CHANGING TO GH - SETTING GOVX COOKIE"
          cookies['govxss'] = {
            :value => '1',
            :expires => -1.hour.from_now
          }  
          cookies['isghgovx'] = {
            :value => '1',
            :expires => -1.hour.from_now
          }  

        end
      end
    end



    @cards = TicketEvolutionService.new({:type => "cards", :id => @id, :core_account => core_account_use}).list
    puts @cards
    
  	render json: {:client => @client,:cards => @cards}
  end
  def add_address
    if request.post?

      core_account_use = request.POST["core_account"]
      if (core_account_use.to_s == "")
        core_account_use = request.GET["core_account"]      
      end
        
      #if (cookies['govxss'].to_s == "1")
      #  core_account_use = "1"
      #end

	  	@address = TicketEvolutionService.new({:type => "address", :id => request.POST["id"], :core_account => core_account_use}).add({:name => request.POST["name"], :street_address => request.POST["street_address"], :locality => request.POST["locality"], :region => request.POST["region"], :postal_code => request.POST["postal_code"], :country_code => request.POST["country_code"]})
	  	render json: @address
	 end
  end
  def add_credit_card
    if request.post?
      
      core_account_use = request.POST["core_account"]      
      if (core_account_use.to_s == "")
        core_account_use = request.GET["core_account"]      
      end
        
      #core_account_use = "2"
      #if (cookies['govxss'].to_s == "1")
      #  core_account_use = "1"
      #end

	  	@cc = TicketEvolutionService.new({:type => "card", :id => request.POST["id"], :core_account => core_account_use}).add({:address_id => request.POST["address_id"], :number => request.POST["number"], :expiration_month => request.POST["expiration_month"], :expiration_year => request.POST["expiration_year"], :verification_code => request.POST["verification_code"], :name => request.POST["name"]})
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

          core_account_use = request.POST["core_account"]
          if (core_account_use.to_s == "")
            core_account_use = request.GET["core_account"]      
          end
                
          #core_account_use = "2"
          #if (cookies['govxss'].to_s == "1")
          #  core_account_use = "1"
          #end

          @client = TicketEvolutionService.new({:type => "client", :core_account => core_account_use}).add({:name => request.POST["name"], :street_address => request.POST["street_address"], :locality => request.POST["locality"], :region => request.POST["region"], :postal_code => request.POST["postal_code"], :country_code => request.POST["country_code"], :email => request.POST["email"], :phone_number => request.POST["phone_number"]})
          if @client.error
            puts "error"
          else
            @user.te_uid = @client.id
            @user.save
          end
          render json: {:client => @client,:user => @user, :temp_password => @temp_password}
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

  def forgot_password
    @user = Client.where(email: params[:email]).first
    @user.password = params[:password]
    @user.password_confirmation = params[:password]
    @user.save
    render text: "Success"
  end

  def exists
    if Client.where(email: request.POST["email"]).exists?
      @exists = true
    else
      @exists = false
    end
    render text: @exists
  end
end