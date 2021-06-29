require "test_helper"

class VisualizationsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @visualization = visualizations(:one)
  end

  test "should get index" do
    get visualizations_url, as: :json
    assert_response :success
  end

  test "should create visualization" do
    assert_difference('Visualization.count') do
      post visualizations_url, params: { visualization: { name: @visualization.name, svg_specs: @visualization.svg_specs } }, as: :json
    end

    assert_response 201
  end

  test "should show visualization" do
    get visualization_url(@visualization), as: :json
    assert_response :success
  end

  test "should update visualization" do
    patch visualization_url(@visualization), params: { visualization: { name: @visualization.name, svg_specs: @visualization.svg_specs } }, as: :json
    assert_response 200
  end

  test "should destroy visualization" do
    assert_difference('Visualization.count', -1) do
      delete visualization_url(@visualization), as: :json
    end

    assert_response 204
  end
end
