class AddSearchIndeces < ActiveRecord::Migration
  
  	  def up
  	  	add_column :events, :name, :string
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
				
				SELECT players.id AS searchable_id, 
				'Player' AS searchable_type, 
				players.name AS term
				FROM players
				JOIN performers ON players.performer_id = performers.id
				
		SQL
	    ActiveRecord::Base.connection.execute <<-SQL
	      CREATE INDEX index_name_on_performer ON performers USING gin(to_tsvector('english', te_name));
	      CREATE INDEX index_venues_on_name ON venues USING gin(to_tsvector('english', name));
	      CREATE INDEX index_events_on_name ON events USING gin(to_tsvector('english', name));
	      CREATE INDEX index_players_on_name ON players USING gin(to_tsvector('english', name));
	    SQL
	  end

	  def down
	    ActiveRecord::Base.connection.execute <<-SQL
	      DROP INDEX index_name_on_performer;
	      DROP INDEX index_venues_on_name;
	      DROP INDEX index_events_on_name;
	      DROP INDEX index_players_on_name;
	    SQL
	    ActiveRecord::Base.connection.execute <<-SQL
	  	DROP VIEW main_searches;
	  	SQL
	  end			
  
end
