class MainSearch < ActiveRecord::Base
  extend Textacular

  attr_accessor :query, :limit

  belongs_to :searchable, polymorphic: true

  def results
    if @query.present?
    	if @limit.present?
      		self.class.search(@query).limit(@limit).preload(:searchable).map(&:searchable).uniq.sort_by{|e| e.priority}
      	else
      		self.class.search(@query).preload(:searchable).map(&:searchable).uniq.sort_by{|e| e.priority}
      	end
    else
      Search.none
    end
  end
end