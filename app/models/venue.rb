class Venue < ActiveRecord::Base
	has_many :tiles
	has_many :performers
end
