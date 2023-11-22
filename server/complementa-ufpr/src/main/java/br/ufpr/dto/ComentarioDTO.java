package br.ufpr.dto;

import java.io.Serializable;

public class ComentarioDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;
    private UsuarioSimplesDTO usuario;
    private String comentario;

    public ComentarioDTO() {
    }

    public ComentarioDTO(Long id, UsuarioSimplesDTO usuario, String comentario) {
        this.id = id;
        this.usuario = usuario;
        this.comentario = comentario;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UsuarioSimplesDTO getUsuario() {
        return usuario;
    }

    public void setUsuario(UsuarioSimplesDTO usuario) {
        this.usuario = usuario;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    @Override
    public String toString() {
        return "Comentario [id=" + getId() + 
               ", usuario=" + getUsuario() + 
               ", comentario ='" + getComentario() + '\'' +
               "]";
    }
}
