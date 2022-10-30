let pivot = new Flexmonster({
  container: "pivot-container",
  componentFolder: "https://cdn.flexmonster.com/",
  toolbar: true,
  report: {
    dataSource: {
      filename: "https://raw.githubusercontent.com/carvaj06/data/main/info_e_1_1.csv"
    },
    
    options: {
      showAggregationLabels: false,
      grid: {
        type: "classic"
      }
    },
    
    formats: [{
      name: "", // an empty name allows specifying the default format for all the measures
      thousandsSeparator: ","
    }],
    
         mapping: {
	    "escenario": {
		 caption : "escenario",
          type: "string",
		      visible:false,
        },
        "cliente": {
		 caption : "Cliente",
          type: "string",
          visible:true,
        },
		"prod_cod": {
		 caption : "producto codigo",
          type: "string",
		  visible:false,
        },

        "prod_nom": {
        caption : "Producto",
          type: "string",
        },
		
        "prod_n3": {
        caption : "Categoria",
          type: "string",
        },
		
        "prod_n2": {
        caption : "SubCategoria",
          type: "string",
        },

        "prod_prov": {
        caption : "Proveedor",
          type: "string",
        },

        "fec_cod": {
        caption : "Fecha",
          type: "string",
        },
		
		"fec_anno": {
		 caption : "Anno",
          type: "string",
		  visible:false,
        },
		
		
		"fec_mes": {
		 caption : "Mes",
          type: "string",
		  visible:false,
        },

		"fec_dia": {
		 caption : "Dia",
          type: "string",
		  visible:false,
        },

		"fec_dia_sem": {
		 caption : "Dia Semana",
          type: "string",
		  visible:true,
        },
		
		"can_n2": {
		 caption : "can n2",
          type: "string",
		  visible:false,
        },		

		"can_n3": {
		 caption : "Canal",
          type: "string",
		  visible:true,
        },
		
        "cliente_top": {
        caption : "Cli Princ",
          type: "string",
        },

        "cliente_top_canal": {
        caption : "Cli Princ Can",
          type: "string",
        },
		
		
		"cliente_top_municipio": {
		 caption : "cliente_top_municipio",
          type: "string",
		  visible:false,
        },	
		
		"producto_top": {
		 caption : "Prod Top",
          type: "string",
		  visible:true,
        },			
		
		"producto_top_canal": {
		 caption : "producto_top_canal",
          type: "string",
		  visible:false,
        },	
		
		"producto_top_municipio": {
		 caption : "producto_top_municipio",
          type: "string",
		  visible:false,
        },	
		
 		"geo_dep": {
		     caption : "Departamento",
         type: "string",
		     visible:true,

        },	
        
		"geo_mun": {
		      caption : "Municipio",
          type: "string",
		      visible:true,
        },	

        

        "valor": {
		caption : "Ventas",
          type: "number",
        },
		
        "cantidad": {
		caption : "Unidades",
          type: "number",
        },
		
		
      },
      
     slice: {
      rows: [{
        uniqueName: "prod_n3"
      }, 
      {
        uniqueName: "cliente_top"
      }
      ],
      measures: [
       {
        caption: "Valor",
        active: true,
        uniqueName: "valor",
        aggregation: "sum"
       },
        {
          caption: "Clientes", 
          uniqueName: "cliente",
          aggregation: "distinctcount"
        }
      ]
    }
  }
});

function runQuery() {
  let slice = {
    rows: [{
      uniqueName: "can_n3"
    }],
    columns: [{
      uniqueName: "fec_dia"
    }],
    measures: [{
        caption: "Valor",
        active: true,
        uniqueName: "valor",
        aggregation: "sum"
    }]
  };
  flexmonster.runQuery(slice);
}

function runQuery2() {
  let slice = {
    rows: [{
      uniqueName: "geo_dep"
    }],
    columns: [{
      uniqueName: "prod_n2"
    }],
    measures: [{
       caption: "Valor",
        active: true,
        uniqueName: "valor",
        aggregation: "sum"
    }]
  };
  flexmonster.runQuery(slice);
}

function setFilters() {
  flexmonster.setFilter("prod_n3", {
    "members": [
      "prod_n33.[ALIMENTOS]",
      "prod_n3.[HOGAR]"
    ]
  });
  flexmonster.setFilter("cliente_top", {
    "members": [
      "cliente_top.[S]"    
      ]
  });
}

function clearFilters() {
  flexmonster.clearFilter("p");
  flexmonster.clearFilter("Country");
}

function changeMeasure() {
  var report = flexmonster.getReport();
  report.slice.measures = [{
       caption: "Valor",
        active: true,
        uniqueName: "valor",
        aggregation: "sum"
  }];
  flexmonster.setReport(report);
}
function switchRowsAndColumns() {
  let slice = pivot.getReport().slice;
  let rows = slice.rows;
  slice.rows = slice.columns;
  slice.columns = rows;
  pivot.runQuery(slice);
}

function setConditions() {
  pivot.addCondition({
    formula: "#value > 300000",
    format: {
      backgroundColor: "#C5E1A5"
    }
  });
  pivot.refresh();
}


function setGridOption(option, value) {
  flexmonster.setOptions({
    grid: {
      [option]: value
    }
  });
  flexmonster.refresh();
}
