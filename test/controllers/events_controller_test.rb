require 'test_helper'

class EventsControllerTest < ActionController::TestCase
  test "should get near" do
    get :near
    assert_response :success
  end

end
