@notes.each do |note|
  json.set! note.id do
    json.extract! note, :id, :title, :content, :plain_text, :updated_at, :created_at, :notebook_id, :tag_ids
  end
end
