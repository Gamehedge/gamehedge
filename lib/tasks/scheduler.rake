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
  		a = TicketEvolutionService.new({:type => "orders", :id => o.te_order_id}).show
  		o.order_status = a["state"]
  		o.save
  	end
  end
  puts "done."
end

task :update_urls => :environment do
  Event.all.each do |e|
      e.name = (e.name.gsub '/', '-')
      e.save
      puts "updated"
    end
    
end