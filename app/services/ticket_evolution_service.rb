class TicketEvolutionService
    
  require 'rubygems'
  require 'ticket_evolution'
  
  # *****************Example of usage**********************
  #@events_tevo =  TicketEvolutionService.new({:type => "order_status"}).sync
  def initialize(params)
      #The parameter type can be: 1. categories, 2. performers, 3. venues, 4. venue_configurations
      @type = params[:type]
      @id = params[:id]
      @perpage = params[:perpage]
      @page = params[:page]
      @name = params[:name]
      @email = params[:email]
      @source = params[:source]
      @latitude = params[:latitude]
      @longitude = params[:longitude]
      @geolocated = params[:geolocated]
      @office_id = 3100;
      
      @connection = TicketEvolution::Connection.new({
          :token => '5bfd4b6110681d224a8c1fa6333f375f',       # => (required) The API token, used to identify you
          :secret => 'g3iR2RLeuzQA9vhDGfw5hRtGMnMDsimyOfQAJ4bi',      # => (required) The API secret, used to sign requests
                        #               More info: [http://developer.ticketevolution.com/signature_tool](http://developer.ticketevolution.com/signature_tool))
          :version => 9,      # => (required) API version to use - the correct version at the time of this writing is 9
          :mode => :production,  # => (optional) Specifies the server environment to use Valid options: :production or :sandbox
          :logger => nil      # => (optional) Object to use for logging requests and
                        #               responses. Any 'Logger' instance object
                        #               is valid. EX: Logger.new('log/te_api.log')
      })
      
  end

  def sync
    case @type
      #Update order statuses from tevo ignoring the final state ones
      when 'order_status'
        @orders = Order.all
        @orders.each do |order|
          @order = @connection.orders.show(order.te_order_id)
          if @order['state'] != "canceled" && @order['state'] != "rejected" && @order['state'] != "completed"
              order.order_status = @order['state']
              order.save
          end
        end
      when 'events'
        #@events = Order.all
        puts "Updating events began"
        Sport.all.each do |s|
          puts String(s.name)
          @events = @connection.events.list({:category_id => s.te_uid, :per_page => 10000, 'updated_at.gte' => Time.now.strftime("%m/%d/%Y")})
          @events.each do |e|
            if e.performances.count < 2
              puts "Not added. Event with one performer."
            else
              is_home = true
              primaries = 0
              e.performances.each do |p|
                if p.primary == true
                  if Performer.where(te_uid: p.performer.id).first == nil
                    puts "Not a home game"
                    is_home = false
                  end
                  primaries += 1
                end
              end
              if primaries == 1
                if is_home == true
                  if (Performer.where(te_uid: e.performances[0].performer.id).first == nil || Performer.where(te_uid: e.performances[1].performer.id).first == nil) && e.performances.count == 2
                    puts "Not added. One of the performers doesn't belong to our database."
                  else
                    name = e.name
                    te_uid = e.id
                    location = e.venue.location
                    occurs_at = e.occurs_at
                    te_venue_id = e.venue.id
                    te_performer_home_id = 0
                    home_performer_id = 0
                    te_performer_visit_id = 0
                    away_performer_id = 0
                    ven = Venue.where(te_uid: te_venue_id).first
                    if ven == nil
                      puts "Adding venue"
                      @venue = @connection.venues.show(te_venue_id)
                      Venue.create(name: @venue.name, address: @venue.address, te_uid: @venue.id, location: @venue.location )
                      ven = Venue.where(te_uid: te_venue_id).first
                    end
                    venue_id = ven.id
                    e.performances.each do |p|
                      @performer = Performer.where(te_uid: p.performer.id).first
                      if @performer != nil
                        if p.primary == true
                          te_performer_home_id = p.performer.id
                          home_performer_id = @performer.id
                          puts "primary"
                        else
                          te_performer_visit_id = p.performer.id
                          away_performer_id = @performer.id
                          puts "not primary"
                        end
                        puts "exist on db"
                        puts e.id
                      else
                        puts "doesnt exist on db"
                      end
                    end
                    if Event.where(te_uid: e.id).first == nil
                      Event.create(slug: ((name.downcase.gsub ' ', '-') + "-tickets"),te_uid: te_uid, te_performer_visit_id: te_performer_visit_id, te_performer_home_id: te_performer_home_id, name: name, home_performer_id: home_performer_id, away_performer_id: away_performer_id, venue_id: venue_id, te_venue_id: te_venue_id, occurs_at: occurs_at, location: location)
                      puts "Doesn't exist. Event Created " + String(e.name)
                    else
                      @event = Event.where(te_uid: e.id).first
                      @event.te_uid = te_uid
                      @event.te_performer_visit_id = te_performer_visit_id
                      @event.te_performer_home_id = te_performer_home_id
                      @event.name = name
                      @event.home_performer_id = home_performer_id
                      @event.away_performer_id = away_performer_id
                      @event.venue_id = venue_id
                      @event.te_venue_id = te_venue_id
                      @event.occurs_at = occurs_at
                      @event.location = location
                      @event.slug = (name.downcase.gsub ' ', '-') + "-tickets"
                      @event.save
                      puts "Exists. Event Updated " + String(e.name)
                    end
                  end
                end
              else
                "No home team or more than one"
              end
            end
          end
        end
        puts "Update completed"
      else
        puts "Invalid type parameter, please check and try again"
    end
  end
  
  def show
    case @type
    when 'tickets'
      @ticket = @connection.ticket_groups.show(@id)
      return @ticket
    when 'clients'
      @client = @connection.clients.show(@id)
      return @client
    else
      puts "Invalid type parameter, please check and try again"
    end
  end
    
  def list
    case @type
    when 'events'
      if @geolocated == "true"
        case @source
        when 'venue'
          @events = @connection.events.list({:venue_id => @id, :page => @page, :per_page => @perpage, :order_by => 'events.occurs_at ASC, events.popularity_score DESC'})
        when 'team'
          @events = @connection.events.list({:performer_id => @id, :page => @page, :per_page => @perpage, :order_by => 'events.occurs_at ASC, events.popularity_score DESC'})
        when 'league'
          @events = @connection.events.list({:category_id => @id, :page => @page, :per_page => @perpage, :lat => @latitude, :lon => @longitude, :order_by => 'events.occurs_at ASC, events.popularity_score DESC'})
        else
          puts "Invalid type parameter, please check and try again"
        end
      else
        case @source
        when 'venue'
          @events = @connection.events.list({:venue_id => @id, :page => @page, :per_page => @perpage, :order_by => 'events.occurs_at ASC, events.popularity_score DESC'})
        when 'team'
          @events = @connection.events.list({:performer_id => @id, :page => @page, :per_page => @perpage, :order_by => 'events.occurs_at ASC, events.popularity_score DESC'})
        when 'league'
          @events = @connection.events.list({:category_id => @id, :page => @page, :per_page => @perpage, :order_by => 'events.occurs_at ASC, events.popularity_score DESC'})
        else
          puts "Invalid type parameter, please check and try again"
        end
      end
      return @events
    when 'tickets'
      @ticket_group = @connection.ticket_groups.list({:event_id => @id, :lightweight => true})
      return @ticket_group
    when 'addresses'
      @client = @connection.clients.show(@id)
      @addresses = @client.addresses.list({:client_id => @id})
      return @addresses
    when 'cards'
      @client = @connection.clients.show(@id)
      @cards = @client.credit_cards.list({:client_id => @id})
      return @cards
    when 'emails'
      @client = @connection.clients.show(@id)
      @emails = @client.email_addresses.list({:client_id => @id})
      return @emails
    when 'phones'
      @client = @connection.clients.show(@id)
      @phones = @client.phone_numbers.list({:client_id => @id})
      return @phones
    else
      puts "Invalid type parameter, please check and try again"
    end
  end

  def add(params)
    case @type
    when 'address'
      @client = @connection.clients.show(@id)
      @address = @client.addresses.create({:client_id => @id, :name => params[:name], :street_address => params[:street_address], :locality => params[:locality], :region => params[:region], :postal_code => params[:postal_code], :country_code => params[:country_code]})
      return @address
    when 'card'
      @client = @connection.clients.show(@id)
      @card = @client.credit_cards.create({:address_id => params[:address_id], :number => params[:number], :expiration_month => params[:expiration_month], :expiration_year => params[:expiration_year], :verification_code => params[:verification_code], :name => params[:name]})
      return @card
    end
  end

  def createShipment(params)
        
        billing_address_id = params[:billing_address_id]
        address_id = params[:address_id]
        credit_card_id = params[:credit_card_id]
        quantity = params[:quantity]
        ticket_group_id = params[:ticket_group_id]
        price = params[:price]
        ticket_group_signature = params[:ticket_group_signature]
        type = params[:type]
        service_type = params[:service_type]
        ship_to_name = params[:ship_to_name]
        amount = params[:amount]
        pay_type = params[:pay_type]
        shipment_price = params[:shipment_price]
        email_address_id = params[:email_address_id]
        session_id = params[:session_id]
        user_agent = params[:user_agent]
        created_by_ip_address = params[:created_by_ip_address]
        service_fee = params[:service_fee]
        
        phone_number_id = params[:selectedPhone] 
        
        items = [{:ticket_group_id  => ticket_group_id, :price => price, :quantity => quantity, :ticket_group_signature => ticket_group_signature }]
        
        if type == "FedEx"
          shipped_items = [{:phone_number_id => phone_number_id, :address_id => address_id, :type => type, :service_type => service_type, :ship_to_name => ship_to_name, :items => items}]
        else
          shipped_items = [{:email_address_id => email_address_id, :phone_number_id => phone_number_id, :type => type, :items => items}]
        end
        
        payments = [{:amount => amount, :type => pay_type, :credit_card_id => credit_card_id}]
            
        @order = @connection.orders.create_client_order({:client_id => @id, :seller_id => @office_id, :shipped_items => shipped_items, :billing_address_id => billing_address_id, :payments => payments, :shipping => shipment_price, :session_id => session_id, :user_agent => user_agent, :created_by_ip_address => created_by_ip_address, :service_fee => service_fee})
        
        
        return @order
    end
end