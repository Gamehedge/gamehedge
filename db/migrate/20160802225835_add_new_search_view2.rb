class AddNewSearchView2 < ActiveRecord::Migration
  def up
  	  	ActiveRecord::Base.connection.execute <<-SQL
	  		CREATE OR REPLACE VIEW main_searches AS
				SELECT performers.id AS searchable_id, 
				'Performer' AS searchable_type, 
				performers.te_name AS term
				FROM performers

				UNION 
				
				SELECT venues.id AS searchable_id, 
				'Venue' AS searchable_type, 
				venues.name AS term
				FROM venues
				
				UNION 
				
				SELECT events.id AS searchable_id, 
				'Event' AS searchable_type, 
				events.name AS term
				FROM events
				UNION
				
				SELECT performers.id AS searchable_id, 
				'Performer' AS searchable_type, 
				players.name AS term
				FROM performers
				JOIN players ON players.performer_id = performers.id
				
		SQL
	  end

	  def down
	    ActiveRecord::Base.connection.execute <<-SQL
	  	DROP VIEW main_searches;
	  	SQL
	  end	
end
