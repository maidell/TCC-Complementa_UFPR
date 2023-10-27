package br.ufpr.dto;

import java.io.Serializable;

public class ComentarioDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;
    private UsuarioDTO usuarioDTO;
    private String comentario;

    public ComentarioDTO() {
    }

    public ComentarioDTO(Long id, UsuarioDTO usuarioDTO, String comentario) {
        this.id = id;
        this.usuarioDTO = usuarioDTO;
        this.comentario = comentario;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UsuarioDTO getUsuarioDTO() {
        return usuarioDTO;
    }

    public void setUsuarioDTO(UsuarioDTO usuarioDTO) {
        this.usuarioDTO = usuarioDTO;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    @Override
    public String toString() {
        return "ComentarioDTO [id=" + id + 
               ", usuarioDTO=" + usuarioDTO + 
               ", comentario='" + comentario + '\'' +
               "]";
    }
}
