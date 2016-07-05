class Division < ActiveRecord::Base
	belongs_to :sport
	belongs_to :division
	has_many :divisions
end
