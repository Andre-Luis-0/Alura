import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;

import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.util.List;
import java.util.Map;

public class MelhoresFilmes {


public static void main(String[] args) throws Exception {
    // fazer uma conexão HTTP e buscar os 250 filmes
		
	String key = System.getenv("IMDB_API_KEY");
	if (key != null){
	
		String url = "https://imdb-api.com/en/API/Top250Movies/"+key;
		URI endereco = URI.create(url);
		HttpClient client = HttpClient.newHttpClient();
		HttpRequest request = HttpRequest.newBuilder(endereco).GET().build();
		HttpResponse<String> response = client.send(request, BodyHandlers.ofString());
		String body = response.body();
		// extrair só os dados que interessam
		var parser = new JasonParser();
		List<Map<String, String>> Listadefilmes = parser.parse(body);
		// manipular e exibir dados
		for (Map<String,String> filme : Listadefilmes) {
			System.out.println("\u001b[1mTítulo : \u001b[37m"+filme.get("title")+"\u001b[m");
			System.out.println("\u001b[1mPoster : \u001b[37m"+filme.get("image")+"\u001b[m");
			String sNota = filme.get("imDbRating");

			//System.out.println( sNota);
			if(sNota==""){
				sNota="0";
			}
			System.out.println("\u001b[1m\u001b[45m\u001b[37mClassificação : " + sNota+"\u001b[m");
			
			double douNota = Double.parseDouble( sNota);
			int nota = (int) douNota;
			String emoji = "";
			for (int i = 0; i < nota; i++) {
				if (nota>=5){
					emoji+="⭐";	
				}else{
					emoji+="🍅";	
				}
			}
			System.out.println(emoji);
			System.out.println();
		}
	}else{
		System.out.println("Não tem chave");
	}
}
}
