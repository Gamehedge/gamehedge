class Api::V1::PerformersController < ApplicationApiController
  include ActionController::HttpAuthentication::Token::ControllerMethods
  include ActionController::MimeResponds
  TOKEN = "TokenHere"
  before_action :authenticate

  skip_before_filter :authenticate_user! # we do not need devise authentication here
  before_filter :fetch_user, :except => [:index, :create]

  def fetch_user
    @performer = Performer.find_by_id(params[:id])
  end

  def index
    if params == nil
      @performers = Performer.all
    else
      @performers = Performer.where(data_params)
    end
    respond_to do |format|
      format.json { render json: @performers }
      format.xml { render xml: @performers }
    end
  end

  def show
    respond_to do |format|
      format.json { render json: @performer }
      format.xml { render xml: @performer }
    end
  end

  def create
    @performer = Performer.new(data_params)
    @performer.password = Devise.friendly_token
    respond_to do |format|
      if @performer.save
        format.json { render json: @performer, status: :created }
        format.xml { render xml: @performer, status: :created }
      else
        format.json { render json: @performer.errors, status: :unprocessable_entity }
        format.xml { render xml: @performer.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @performer.update_attributes(data_params)
        format.json { render json: @performer, status: :ok }
        format.xml { render xml: @performer, status: :ok }
      else
        format.json { render json: @performer.errors, status: :unprocessable_entity }
        format.xml { render xml: @performer.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    respond_to do |format|
      if @performer == nil
        format.json { render json: {"message":"Performer does not exist"}, status: :unprocessable_entity }
        format.xml { render xml: {"message":"Performer does not exist"}, status: :unprocessable_entity }
      elsif @performer.destroy
        format.json { render json: {"message":"Performer deleted"}, head: :no_content,status: :ok }
        format.xml { render xml: {"message":"Performer deleted"}, head: :no_content, status: :ok }
      else
        format.json { render json: @performer.errors, status: :unprocessable_entity }
        format.xml { render xml: @performer.errors, status: :unprocessable_entity }
      end
    end
  end

  def data_params
    params.permit(:id, :name, :te_slug, :image, :division_id, :sport_id)
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