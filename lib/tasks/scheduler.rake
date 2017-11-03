desc "This task is called by the Heroku scheduler add-on"
task :update_events => :environment do
  puts "removing older events"
  Event.where('occurs_at < ?',Time.now).each do |e|
    e.delete()
    puts e.occurs_at
  end
  puts "Updating events..."
  TicketEvolutionService.new({:type => "events"}).sync
  puts "Updating orders state"
  Order.all.each do |o|
  	if o.order_status != "rejected" && o.order_status != "completed"
  		a = TicketEvolutionService.new({:type => "orders", :id => o.te_order_id, :core_account => "1"}).show
  		o.order_status = a["state"]
  		o.save
  	end
  end
  puts "done."
end

task :update_urls => :environment do
    Order.all.each do |o|
      e = Event.where(name: o.event_name).first
      if e != nil
        o.sport_id = e.home_performer.sport.id
        o.save
      end
      puts "updated " + o.id.to_s
    end

    
end