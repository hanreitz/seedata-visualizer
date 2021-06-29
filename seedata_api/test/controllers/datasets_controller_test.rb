require "test_helper"

class DatasetsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @dataset = datasets(:one)
  end

  test "should get index" do
    get datasets_url, as: :json
    assert_response :success
  end

  test "should create dataset" do
    assert_difference('Dataset.count') do
      post datasets_url, params: { dataset: { contents: @dataset.contents, name: @dataset.name } }, as: :json
    end

    assert_response 201
  end

  test "should show dataset" do
    get dataset_url(@dataset), as: :json
    assert_response :success
  end

  test "should update dataset" do
    patch dataset_url(@dataset), params: { dataset: { contents: @dataset.contents, name: @dataset.name } }, as: :json
    assert_response 200
  end

  test "should destroy dataset" do
    assert_difference('Dataset.count', -1) do
      delete dataset_url(@dataset), as: :json
    end

    assert_response 204
  end
end
