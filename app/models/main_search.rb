class MainSearch < ActiveRecord::Base
  extend Textacular

  attr_accessor :query, :limit

  belongs_to :searchable, polymorphic: true

  def results
    if @query.present?
    	if @limit.present?
      		self.class.fuzzy_search(@query).order('searchable_type DESC').limit(@limit).preload(:searchable).map(&:searchable).uniq
      	else
      		self.class.fuzzy_search(@query).order('searchable_type DESC').preload(:searchable).map(&:searchable).uniq
      	end
    else
      Search.none
    end
  end
end