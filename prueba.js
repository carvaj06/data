<script type="text/javascript">
  
function customizeCellFunction(cell, data) {
  if (data && data.hierarchy && data.hierarchy.uniqueName == "Price" && data.type == "value") {
    if (!data.isTotal) {
      cell.text = `<div class="container">
      	<div class="dark-grey">
      		<div class="container green center" style="width:${(data.value && data.value > 100)?'100%':cell.text}">${cell.text}</div>
      	</div>
      </div>`
    }
  }
}
</script>
