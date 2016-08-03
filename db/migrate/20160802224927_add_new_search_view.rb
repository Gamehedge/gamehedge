class AddNewSearchView < ActiveRecord::Migration
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
				
				SELECT players.id AS searchable_id, 
				'Player' AS searchable_type, 
				players.name AS term
				FROM players
				JOIN performers ON players.performer_id = performers.id
				
		SQL
	    ActiveRecord::Base.connection.execute <<-SQL
	      CREATE INDEX index_name_on_performer_2 ON performers USING gin(to_tsvector('english', name));
	    SQL
	  end

	  def down
	    ActiveRecord::Base.connection.execute <<-SQL
	      DROP INDEX index_name_on_performer_2;
	    SQL
	    ActiveRecord::Base.connection.execute <<-SQL
	  	DROP VIEW main_searches;
	  	SQL
	  end		
end
