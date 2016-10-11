class Division < ActiveRecord::Base
	belongs_to :sport
	belongs_to :division
	has_many :divisions
	has_attached_file :image, styles: { medium: "300x300>", thumb: "100x100#" }, :s3_headers => { 
            'Cache-Control' => 'max-age=315576000', 'Expires' => 10.years.from_now.httpdate 
    }, 
    :url => ':s3_alias_url',
    :s3_host_alias => 'd2fj37dggc6l3c.cloudfront.net'
	
    validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
	def display_name
		if self.division == nil
			return String(self.sport.name) +  " " + self.name
		else
			return String(self.sport.name) + " " + String(self.division.name) + " " + self.name
		end
	end

  def image_url
        image.url
    end
    def image_url_medium
      image.url(:medium)
    end
    def image_url_thumb
      image.url(:thumb)
    end
end
