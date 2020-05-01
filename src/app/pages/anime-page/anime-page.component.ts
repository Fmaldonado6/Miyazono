import { AnimeService } from './../../services/anime.service';
import { AnimeData } from './../../services/animeData.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'anime-page',
  templateUrl: './anime-page.component.html',
  styleUrls: ['./anime-page.component.css']
})
export class AnimePage implements OnInit {

  animeInfo = {
    id:"",
    title: "",
    poster: "",
    episodes: [],
    synopsis: ""
  };

  states = {
    loading: 0,
    loaded: 1,
    error: 2

  }
  currentState = this.states.loading
  constructor(private animeData: AnimeData, private animeService: AnimeService, private route: ActivatedRoute, private router: Router) {
    if (animeData.data == undefined) {
      this.getEpisodes();
    } else {
      this.animeInfo = animeData.data
      this.currentState = this.states.loaded


    }
  }

  getEpisodes() {
    this.route.queryParams.subscribe(params => {
      let animeName = params.animeName
      let id = params.animeId
      this.animeService.getSearchResult(animeName).subscribe(results => {
        console.log(results)
        let current = 0
        while (results["search"][current].id != id) {
          current++;
        }
        let data = results["search"][current]
        this.animeInfo = data
        this.currentState = this.states.loaded
        console.log(this.animeInfo)

      }, () => {
        this.currentState = this.states.error
      })

    })
  }

  changeEpisodePage(episode) {
    console.log(episode)
    this.animeService.getAnimeServers(episode.id).subscribe(server => {
      this.animeData.episodeData = {
        title: this.animeInfo.title,
        id:this.animeInfo.id,
        otherEpisodes:this.animeInfo.episodes,
        number: episode.episode,
        servers: server["servers"]
      }
      let extras: NavigationExtras = {
        queryParams: {
          "episodeId": episode.id,
          "animeId":this.animeInfo.id,
          "episodeTitle": this.animeInfo.title,
          "episodeNumber": episode.episode,

        }
      }
      this.router.navigate(["/watch"], extras)
    })

  }

  ngOnInit(): void {
  }

}
