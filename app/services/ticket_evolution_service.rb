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
          @events = @connection.events.list({:category_id => s.te_uid, :per_page => 10000})
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
                    if Event.where(te_uid: e.id).first == nil
                      puts "Doesn't exist. Creating Event " + String(e.name)
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
                      Event.create(te_uid: te_uid, te_performer_visit_id: te_performer_visit_id, te_performer_home_id: te_performer_home_id, name: name, home_performer_id: home_performer_id, away_performer_id: away_performer_id, venue_id: venue_id, te_venue_id: te_venue_id, occurs_at: occurs_at, location: location)
                      puts "Event created"
                    else
                      puts "Exists. Event " + String(e.name)
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
    else
      puts "Invalid type parameter, please check and try again"
    end
  end
end