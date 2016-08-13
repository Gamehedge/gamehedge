desc "This task is called by the Heroku scheduler add-on"
task :update_events => :environment do
  puts "Updating events..."
  TicketEvolutionService.new({:type => "events"}).sync
  puts "done."
end
