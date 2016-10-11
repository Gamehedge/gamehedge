class Api::V1::EventsController < ApplicationApiController
  include ActionController::HttpAuthentication::Token::ControllerMethods
  include ActionController::MimeResponds
  
  TOKEN = "TokenHere"
  before_action :authenticate

  skip_before_filter :authenticate_user! # we do not need devise authentication here
  before_filter :fetch_user, :except => [:index, :create]


  
  
  def fetch_user
    @event = Event.where(te_uid: params[:id]).first
  end

  def index
    if params[:light]
      @events = Event.where(data_params).where("occurs_at >=?", params[:today_date]).where(is_active: true).order("name")
      respond_to do |format|
        format.json { render json: @events.to_json(:only => [:id, :name])}
        format.xml { render xml: @events.to_json(:only => [:id, :name])}
      end
    else
      if params == nil
        @events = Event.all.order("occurs_at")
      else
        if params[:selected_team] == nil
          @events = Event.where(data_params).where("occurs_at >=?", params[:today_date]).where(is_active: true).order("occurs_at")
        else
          @events = Event.where( 
            Event.arel_table[:home_performer_id].eq(params[:selected_team]).or(
            Event.arel_table[:away_performer_id].eq(params[:selected_team])) 
          ).where(data_params).where("occurs_at >=?", params[:today_date]).where(is_active: true).order("occurs_at")
        end
      end
      if(params[:page] != nil)
        if params[:per_page] == nil
          per_page = 25
        else
          per_page = params[:per_page]
        end
        total = @events.count
        @events = @events.paginate(:page => params[:page],  :per_page => per_page)
        @events2 = { }
        @events2[:data] = ActiveSupport::JSON.decode(@events.to_json(:only => [:id, :name, :is_active, :venue_configuration_id, :te_uid, :te_date, :url, :occurs_at, :location, :slug], :include => {:home_performer => {:only =>[:id, :name, :te_uid, :description, :url],:include => {:sport => {:only =>[:id, :name, :ggg]}}},:away_performer => {:only =>[:id, :name, :te_uid, :description, :url]},:sport => {:only =>[:id, :name, :te_uid, :description, :url, :ggg]},:venue => {:only =>[:id, :te_uid, :name, :description, :url, :location]}}))
        @events2[:total] = total
        @events2[:page] = params[:page]
        @events2[:per_page] = per_page
      end
      respond_to do |format|
        format.json { render json: @events2 }
        format.xml { render xml: @events2 }
      end
    end
  end

  def show
    respond_to do |format|
      format.json { render json: @event.to_json(:only => [:id, :name, :is_active, :venue_configuration_id, :te_uid, :te_date, :url, :occurs_at, :location, :slug], :include => {:home_performer => {:only =>[:id, :name, :te_uid, :description, :url],:include => {:sport => {:only =>[:id, :name, :ggg]}}},:away_performer => {:only =>[:id, :name, :te_uid, :description, :url]},:sport => {:only =>[:id, :name, :te_uid, :description, :url, :ggg]},:venue => {:only =>[:id, :te_uid, :name, :description, :url, :location]}})}
      format.xml { render xml: @event.to_json(:only => [:id, :name, :is_active, :venue_configuration_id, :te_uid, :te_date, :url, :occurs_at, :location, :slug], :include => {:home_performer => {:only =>[:id, :name, :te_uid, :description, :url],:include => {:sport => {:only =>[:id, :name, :ggg]}}},:away_performer => {:only =>[:id, :name, :te_uid, :description, :url]},:sport => {:only =>[:id, :name, :te_uid, :description, :url, :ggg]},:venue => {:only =>[:id, :te_uid, :name, :description, :url, :location]}})}
    end
  end

  def create
    @event = Event.new(data_params)
    respond_to do |format|
      if @event.save
        format.json { render json: @event, status: :created }
        format.xml { render xml: @event, status: :created }
      else
        format.json { render json: @event.errors, status: :unprocessable_entity }
        format.xml { render xml: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @event.update_attributes(data_params)
        format.json { render json: @event, status: :ok }
        format.xml { render xml: @event, status: :ok }
      else
        format.json { render json: @event.errors, status: :unprocessable_entity }
        format.xml { render xml: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    respond_to do |format|
      if @event == nil
        format.json { render json: {"message":"Event does not exist"}, status: :unprocessable_entity }
        format.xml { render xml: {"message":"Event does not exist"}, status: :unprocessable_entity }
      elsif @event.destroy
        format.json { render json: {"message":"Event deleted"}, head: :no_content,status: :ok }
        format.xml { render xml: {"message":"Event deleted"}, head: :no_content, status: :ok }
      else
        format.json { render json: @event.errors, status: :unprocessable_entity }
        format.xml { render xml: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  def data_params
    params.permit(:id, :te_uid, :te_performer_home_id, :is_active, :te_performer_visit_id, :te_date, :name, :home_performer_id, :away_performer_id, :sport_id, :occurs_at, :location, :venue_id, :slug, :venue_configuration_id)
  end

  private
    def authenticate
      authenticate_or_request_with_http_token do |token, options|
        # Compare the tokens in a time-constant manner, to mitigate
        # timing attacks.
        ActiveSupport::SecurityUtils.secure_compare(
          ::Digest::SHA256.hexdigest(token),
          ::Digest::SHA256.hexdigest(TOKEN)
        )
      end
    end
end